import { DataSource } from "typeorm";

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const dataSourceMockFactory: (getDummyObject:Function) => MockType<DataSource> = jest.fn(
  (getDummyObject) => ({
    getRepository: jest.fn().mockImplementation(
      () => ({
        create: jest.fn(() => getDummyObject()),
        find: jest.fn(),
        findBy: jest.fn(),
        findOneBy: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      })
    )      
  })
);