import { DynamicModule, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ALL_SCHEMA } from 'src/schema';
import { MongooseConfigService } from 'src/services/db-config.service';

@Global()
@Module({})
export class AppDatabaseModule {
    private static mongoDbConnectionModule: DynamicModule;
    private static mongoDbAllSchemaModule: DynamicModule;

    public static forRootConnection() {
        if (!this.mongoDbConnectionModule) {
            // console.log('creating connection module');
            this.mongoDbConnectionModule = MongooseModule.forRootAsync({
                useClass: MongooseConfigService,
            });
        }
        return this.mongoDbConnectionModule;
    }

    public static forFeatureAsync() {
        if (!this.mongoDbAllSchemaModule) {
            // console.log('creating schema module');
            this.mongoDbAllSchemaModule = MongooseModule.forFeature(ALL_SCHEMA);
        }
        return this.mongoDbAllSchemaModule;
    }
}
