import { Test, TestingModule } from '@nestjs/testing';
import { ReportResolver } from './report.resolver';
import { ReportService } from './report.service';
import { Report, CreateReportInput, UpdateReportInput } from './report.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { ReportReasonType } from '@prisma/client';

// Mock data for testing
const mockReport: Report = {
  id: '1',
  byId: '',
  targetId: '',
  targetType: 'USER',
  createdAt: new Date(),
};

// Mock implementation of the ReportService
const mockReportService = {
  create: jest.fn().mockResolvedValue(mockReport),
  findAll: jest.fn().mockResolvedValue([mockReport]),
  findOne: jest.fn().mockResolvedValue(mockReport),
  update: jest.fn().mockResolvedValue(mockReport),
  delete: jest.fn().mockResolvedValue(mockReport),
};

describe('ReportResolver', () => {
  let resolver: ReportResolver;
  let service: ReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportResolver,
        {
          provide: ReportService,
          useValue: mockReportService, // Inject the mocked service
        },
      ],
    }).compile();

    resolver = module.get<ReportResolver>(ReportResolver);
    service = module.get<ReportService>(ReportService);
  });
  describe('createReport', () => {
    it('should create and return a reports', async () => {
      const input: CreateReportInput = {
        ...mockReport,
        by: mockReport.byId,
        reason: ReportReasonType.ABUSE,
      };

      const result = await resolver.createReport(input);
      // expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockReport);
    });
  });

  describe('reports (findAll)', () => {
    it('should return an array of reports', async () => {
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 10,
        limit: 10,
        page: 1,
      };

      // Call the resolver method
      const result = await resolver.reports(paginationArgs);

      // Expect the service method to have been called
      expect(service.findAll).toHaveBeenCalledWith(paginationArgs);
      expect(result).toEqual([mockReport]);
    });
  });

  describe('report (findOne)', () => {
    it('should return a single report by ID', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.report(id);

      // Expect the service method to have been called
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockReport);
    });
  });

  describe('updateReport (update)', () => {
    it('should update and return the modified report', async () => {
      const id = '1';
      const updateData = { reason: ReportReasonType.FAKE };
      const input: UpdateReportInput = {
        ...updateData,
      };

      // Call the resolver method
      const result = await resolver.updateReport(id, input);

      // Expect the service method to have been called with correct arguments
      expect(service.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockReport);
    });
  });

  describe('deleteReport (delete)', () => {
    it('should delete a report and return it', async () => {
      const id = '1';

      // Call the resolver method
      const result = await resolver.deleteReport(id);

      // Expect the service method to have been called
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockReport);
    });
  });
});
