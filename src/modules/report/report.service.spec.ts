import { Test, TestingModule } from '@nestjs/testing';
import { ReportService } from './report.service';
import { PrismaService } from '../prisma/prisma.service';
import { Report, ReportReasonType } from '@prisma/client';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { Prisma } from '@prisma/client';

// Mock data for testing
const mockReport: Report = {
  id: '1',
  byId: '',
  targetId: '',
  targetType: 'USER',
  createdAt: new Date(),
  reason: ReportReasonType.ABUSE,
  reasonText: 'ddd',
  updatedAt: new Date(),
};

// Mock implementation of the PrismaService
const mockPrismaService = {
  report: {
    create: jest.fn().mockResolvedValue(mockReport),
    findMany: jest.fn().mockResolvedValue([mockReport]),
    findUnique: jest.fn().mockResolvedValue(mockReport),
    update: jest.fn().mockResolvedValue(mockReport),
    delete: jest.fn().mockResolvedValue(mockReport),
  },
};

describe('ReportService', () => {
  let service: ReportService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Inject the mocked PrismaService
        },
      ],
    }).compile();

    service = module.get<ReportService>(ReportService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  describe('create', () => {
    it('should create and return a report', async () => {
      const input: Prisma.ReportCreateInput = {
        ...mockReport,
        by: { connect: { id: '1' } },
      };

      const result = await service.create(input);
      expect(prisma.report.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(result).toEqual(mockReport);
    });
  });

  describe('findAll', () => {
    it('should return an array of reports', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the service method
      const result = await service.findAll(paginationArgs);

      // Expect the prisma method to have been called
      expect(prisma.report.findMany).toHaveBeenCalledWith({
        skip: paginationArgs.skip,
        take: paginationArgs.take,
      });
      expect(result).toEqual([mockReport]);
    });
  });

  describe('findOne', () => {
    it('should return a single report by ID', async () => {
      const id = '1';

      // Call the service method
      const result = await service.findOne(id);

      // Expect the prisma method to have been called
      expect(prisma.report.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockReport);
    });
  });

  describe('update', () => {
    it('should update and return the modified report', async () => {
      const id = '1';
      const updateData: Prisma.ReportUpdateInput = {
        reason: ReportReasonType.HATE,
      };

      // Call the service method
      const result = await service.update(id, updateData);

      // Expect the prisma method to have been called with correct arguments
      expect(prisma.report.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });
      expect(result).toEqual(mockReport);
    });
  });

  describe('delete', () => {
    it('should delete a report and return it', async () => {
      const id = '1';

      // Call the service method
      const result = await service.delete(id);

      // Expect the prisma method to have been called
      expect(prisma.report.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockReport);
    });
  });
});
