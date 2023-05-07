import { NextFunction, Response } from "express";

export class HttpResponse {
  status?: number;
  json?: object | string | null;
  cookie?: { name: string; value: string };

  constructor(props: {
    status?: number;
    json?: object;
    cookie?: { name: string; value: string };
  }) {
    this.status = props?.status;
    this.json = props?.json;
    this.cookie = props?.cookie;
  }
}

export type IController = (body, params?, next?) => Promise<HttpResponse>;

/**
 * @description This interceptor is responsible for handling all exceptions that occur in the routes. It encompasses all routes
 * in a single place and ensures that error and successful responses are handled in one place.
 */
export function InterceptorAdapter(
  controller: IController,
  infos?: "add-user-infos" | "not-user-infos"
) {
  return async function (req, res: Response, next: NextFunction) {
    const body = req.body;
    const params = req.params;
    const cookie = req.cookie;

    try {
      if (infos === "add-user-infos") {
        body.user_infos = req.user_infos;
        body.cookie = cookie;
      }

      const result = await controller(body, params);

      if (result.cookie?.name && result.cookie?.value) {
        res.cookie(result.cookie.name, result.cookie.value, { httpOnly: true });
      }

      return res.status(result?.status || 200).json(result?.json);
    } catch (e) {
      /**
       * Sending error throws to an Express error filter.
       */
      return next(e);
    }
  };
}
