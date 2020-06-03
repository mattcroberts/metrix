import { Length } from 'class-validator';
import { Arg, Args, ArgsType, Ctx, Field, ID, Mutation, Query, Resolver } from 'type-graphql';
import { In, Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Metric } from '../metrics/Metric.model';
import { ContextType } from '../types';
import { Analysis } from './Analysis.model';

@ArgsType()
class AnalysisArgs {
  @Field((returns) => [ID])
  metricIds: Metric['id'][];

  @Length(3, 20)
  @Field()
  name: string;
}

@ArgsType()
class UpdateAnalysisArgs extends AnalysisArgs {
  @Field((returns) => ID)
  id: string;
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

  @Mutation((returns) => Analysis, { nullable: false })
  async updateAnalysis(@Ctx() { user }: ContextType, @Args() { id, name, metricIds }: UpdateAnalysisArgs) {
    const metrics = await this.metricRepository.find({ id: In(metricIds), user });
    return this.analysisRepository.save({ id, name, metrics });
  }

  @Mutation((returns) => Analysis, { nullable: true })
  async deleteAnalysis(@Ctx() { user }: ContextType, @Arg('id', () => ID) id: string) {
    const analysis = await this.analysisRepository.findOneOrFail({ id, user });
    await this.analysisRepository.remove(analysis);
    return null;
  }
}
