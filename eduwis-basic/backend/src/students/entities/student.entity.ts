import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  dateOfBirth: Date;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  parentName: string;

  @Column({ nullable: true })
  parentEmail: string;

  @Column({ nullable: true })
  parentPhone: string;

  @Column({ nullable: true })
  emergencyContact: string;

  @Column({ nullable: true })
  bloodGroup: string;

  @Column({ nullable: true })
  medicalConditions: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  enrollmentDate: Date;

  @Column({ nullable: true })
  graduationDate: Date;

  @Column({ nullable: true })
  currentGrade: string;

  @Column({ nullable: true })
  currentSection: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

