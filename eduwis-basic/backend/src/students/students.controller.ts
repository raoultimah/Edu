import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@ApiTags('students')
@Controller('students')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({ status: 200, description: 'Return all students' })
  async findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get student by id' })
  @ApiResponse({ status: 200, description: 'Return student by id' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async findOne(@Param('id') id: string) {
    return this.studentsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create student' })
  @ApiResponse({ status: 201, description: 'Student successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update student' })
  @ApiResponse({ status: 200, description: 'Student successfully updated' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete student' })
  @ApiResponse({ status: 200, description: 'Student successfully deleted' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}

