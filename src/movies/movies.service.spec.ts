import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

//테스트를 묘사
describe('MoviesService', () => {
  let service: MoviesService;

  //beforeEach() 테스트를 하기전 실행되는 것
  //beforeAll()
  //afterEach()
  //afterAll()
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  // 'it' word 줄임말과 individual의 줄임말 같아보임ㅋㅋ test를 만들어 내는 기본 함수
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be 4', () => {
    //테스트 에는 조건이 필요함
    expect(2 + 3).toEqual(5);
  });

  describe('getAll()', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['Test genres'],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      //expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        //expect(e.message).toEqual(`Movie with ID 999 not found`);
      }
    });
  });

  describe('deleteOne()', () => {
    it('delte a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['Test genres'],
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        //expect(e.message).toEqual(`Movie with ID 999 not found`);
      }
    });
  });

  describe('create()', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;

      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['Test genres'],
      });

      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update()', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['Test genres'],
      });

      service.update(1, { title: 'Updated Test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });

    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        //expect(e.message).toEqual(`Movie with ID 999 not found`);
      }
    });
  });
});
