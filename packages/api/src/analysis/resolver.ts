import { Arg, Mutation, Resolver, ID, Query, Ctx, ArgsType, Args, Field } from 'type-graphql';
import { Analysis } from './Analysis.model';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository, In } from 'typeorm';
import { Metric } from '../metrics/Metric.model';
import { ContextType } from '../types';
import { Length } from 'class-validator';

@ArgsType()
class AnalysisArgs {
  @Field((returns) => ID)
  metricIds: Metric['id'][];

  @Length(3, 20)
  @Field()
  name: string;
}

@Resolver((of) => Analysis)
export class AnalysisResolver {
  @InjectRepository(Analysis)
  analysisRepository: Repository<Analysis>;

  @InjectRepository(Metric)
  metricRepository: Repository<Metric>;

  @Query((returns) => [Analysis])
  async allAnalyses(@Ctx() { user }: ContextType) {
    return this.analysisRepository.find({ where: { user }, relations: ['metrics'] });
  }

  @Query((returns) => Analysis)
  async getAnalysisWithData(@Ctx() { user }: ContextType, @Arg('id') id: string) {
    const analysis = await this.analysisRepository.findOne({ id, user }, { relations: ['metrics'] });
    return analysis;
  }

  @Mutation((returns) => Analysis, { nullable: false })
  async createAnalysis(@Ctx() { user }: ContextType, @Args() { name, metricIds }: AnalysisArgs) {
    const metrics = await this.metricRepository.find({ id: In(metricIds), user });
    const analysis = await this.analysisRepository.create({ name, metrics, user });
    return await this.analysisRepository.save(analysis);
  }
}
