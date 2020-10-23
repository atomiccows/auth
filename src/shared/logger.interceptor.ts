import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const now = Date.now();
    const ctx: any = GqlExecutionContext.create(context);

    const resolverName = ctx.constructorRef.name;
    const info = ctx.getInfo();

    return next
      .handle()
      .pipe(
        tap(() => Logger.log(
          `${info.parentType} ${info.fieldName} ${Date.now() - now}ms`,
          resolverName,
        )),
      );

  }
}
