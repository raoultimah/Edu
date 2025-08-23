import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsDate, IsOptional, IsEmail, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '../entities/student.entity';

export class CreateStudentDto {
  @ApiProperty({
    description: 'Student ID',
    example: 'STU-2023-001',
  })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({
    description: 'Student gender',
    enum: Gender,
    example: Gender.MALE,
  })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty({
    description: 'Student date of birth',
    example: '2005-01-15',
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dateOfBirth: Date;

  @ApiProperty({
    description: 'Student address',
    example: '123 Main St, City, Country',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'Student phone number',
    example: '+1234567890',
    required: false,
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Parent name',
    example: 'John Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  parentName?: string;

  @ApiProperty({
    description: 'Parent email',
    example: 'parent@example.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  parentEmail?: string;

  @ApiProperty({
    description: 'Parent phone',
    example: '+1234567890',
    required: false,
  })
  @IsString()
  @IsOptional()
  parentPhone?: string;

  @ApiProperty({
    description: 'Emergency contact',
    example: '+1234567890',
    required: false,
  })
  @IsString()
  @IsOptional()
  emergencyContact?: string;

  @ApiProperty({
    description: 'Blood group',
    example: 'A+',
    required: false,
  })
  @IsString()
  @IsOptional()
  bloodGroup?: string;

  @ApiProperty({
    description: 'Medical conditions',
    example: 'None',
    required: false,
  })
  @IsString()
  @IsOptional()
  medicalConditions?: string;

  @ApiProperty({
    description: 'Enrollment date',
    example: '2023-09-01',
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  enrollmentDate?: Date;

  @ApiProperty({
    description: 'Current grade',
    example: '10',
    required: false,
  })
  @IsString()
  @IsOptional()
  currentGrade?: string;

  @ApiProperty({
    description: 'Current section',
    example: 'A',
    required: false,
  })
  @IsString()
  @IsOptional()
  currentSection?: string;

  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}

