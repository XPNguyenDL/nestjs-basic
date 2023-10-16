import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Import controllers
import {
  HomepageController,
  UsersController
} from './controllers';

// Import services
import {
  UsersService
} from './services';

// Import entities
import {
  Notification,
  NotificationSchema,
  Schedule,
  ScheduleSchema,
  Student,
  StudentSchema,
  StudentTutorRelationship,
  StudentTutorRelationshipSchema,
  Subject,
  SubjectSchema,
  Tutor,
  TutorEvaluation,
  TutorEvaluationSchema,
  TutorSchema,
  TutorSubject,
  TutorSubjectSchema,
  User,
  UserSchema
} from './core/entities';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryService } from './media/cloud-file-media-manager';
import { CorsMiddleware } from './middlewares/cors.middleware';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema},
      {name: Tutor.name, schema: TutorSchema},
      {name: Student.name, schema: StudentSchema},
      {name: Notification.name, schema: NotificationSchema},
      {name: Schedule.name, schema: ScheduleSchema},
      {name: StudentTutorRelationship.name, schema: StudentTutorRelationshipSchema},
      {name: Subject.name, schema: SubjectSchema},
      {name: TutorEvaluation.name, schema: TutorEvaluationSchema},
      {name: TutorSubject.name, schema: TutorSubjectSchema}
    ]),
    JwtModule.register({
      secret: 'tutor-connect-secret-key', // Replace with your actual secret key
      signOptions: { expiresIn: '1h' }, // Adjust options as needed
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [
    UsersController,
    HomepageController,
  ],
  providers: [
    UsersService,
    CloudinaryService
  ],
})
export class AppModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
