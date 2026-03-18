import { HttpInterceptorFn, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "express";
import { catchError, EMPTY, throwError } from "rxjs";
import { NotificationService } from "../service/notification/notification.service";
import { ErrorResponse, isErrorResponse } from "../types/responses/error.response.type";



export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const notificationService = inject(NotificationService);
    return next(req).pipe(catchError((httpErrorResponse: HttpErrorResponse) => {
        if (isErrorResponse(httpErrorResponse.error)) {
            const error = httpErrorResponse.error;
            notificationService.show({title: error.error, description: error.message, status: error.status, isError: true});
            return EMPTY;
        }
        return throwError(() => httpErrorResponse);
    }));
}