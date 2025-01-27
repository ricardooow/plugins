import { Piece } from '@sapphire/pieces';
import type { Awaitable } from '@sapphire/utilities';
import type { ApiRequest } from './api/ApiRequest';
import type { ApiResponse } from './api/ApiResponse';
import type { Route } from './Route';

/**
 * @since 1.0.0
 */
export abstract class Middleware extends Piece {
	/**
	 * The position the middleware has. The {@link MiddlewareStore} will run all middlewares with lower position than
	 * this one.
	 *
	 * The built-in middlewares follow the following positions:
	 * - headers: 10
	 * - body: 20
	 * - cookies: 30
	 * - auth: 40
	 */
	public readonly position: number;

	public constructor(context: Piece.Context, options: Middleware.Options = {}) {
		super(context, options);
		this.position = options.position ?? 1000;
	}

	/**
	 * The method to be overridden by other middlewares.
	 * @param request The client's request.
	 * @param response The server's response.
	 * @param route The route that matched this request, will be `null` if none matched.
	 */
	public abstract run(request: ApiRequest, response: ApiResponse, route: Route | null): Awaitable<unknown>;
}

/**
 * The options for all middlewares.
 */
export interface MiddlewareOptions extends Piece.Options {
	/**
	 * The position to insert the middleware at.
	 * @see Middleware#position
	 * @default 1000
	 */
	position?: number;
}

export namespace Middleware {
	export type Context = Piece.Context;
	export type Options = MiddlewareOptions;
}
