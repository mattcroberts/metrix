import { Arg, Mutation, Resolver, ID, Query } from 'type-graphql';
import { Analysis } from './Analysis.model';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { Metric } from '../metrics/Metric.model';

@Resolver((of) => Analysis)
export class AnalysisResolver {
  @InjectRepository(Analysis)
  analysisRepository: Repository<Analysis>;

  @InjectRepository(Metric)
  metricRepository: Repository<Metric>;

  @Query((returns) => [Analysis])
  async allAnalyses() {
    return this.analysisRepository.find();
  }

  @Query((returns) => Analysis)
  async getAnalysisWithData(@Arg('id') id: string) {
    const analysis = await this.analysisRepository.findOne(id, { relations: ['metrics'] });
    return analysis;
  }

  @Mutation((returns) => Analysis, { nullable: false })
  async createAnalysis(@Arg('name') name: string, @Arg('metricIds', (returns) => ID) metricIds: string[]) {
    const metrics = await this.metricRepository.findByIds(metricIds);
    const analysis = await this.analysisRepository.create({ name, metrics });
    return await this.analysisRepository.save(analysis);
  }
}
