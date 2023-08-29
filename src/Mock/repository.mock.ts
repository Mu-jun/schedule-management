import { Repository } from "typeorm"

export type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

export const mockRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findBy: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
})