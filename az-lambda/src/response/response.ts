import { status } from '@cpmech/httpcodes';
import { IResult } from '../types';
import { corsHeaders } from './corsHeaders';

const success = (
  code: number,
  data: any,
  headers: any = {},
  returnRawData: boolean = false,
): IResult => {
  return {
    statusCode: code,
    headers: { ...headers, ...corsHeaders },
    body: returnRawData ? data : JSON.stringify(data),
  };
};

const failure = (
  code: number,
  errorMessage: string,
  headers: any = {},
  returnRawData: boolean = false,
): IResult => {
  return {
    statusCode: code,
    headers: { ...headers, ...corsHeaders },
    body: returnRawData ? errorMessage : JSON.stringify({ errorMessage }),
  };
};

const ok = (data: any, headers: any = {}, returnRawData: boolean = false): IResult => {
  return {
    statusCode: status.success.ok,
    headers: { ...headers, ...corsHeaders },
    body: returnRawData ? data : JSON.stringify(data),
  };
};

const created = (data: any, headers: any = {}, returnRawData: boolean = false): IResult => {
  return {
    statusCode: status.success.created,
    headers: { ...headers, ...corsHeaders },
    body: returnRawData ? data : JSON.stringify(data),
  };
};

const accepted = (data: any, headers: any = {}, returnRawData: boolean = false): IResult => {
  return {
    statusCode: status.success.accepted,
    headers: { ...headers, ...corsHeaders },
    body: returnRawData ? data : JSON.stringify(data),
  };
};

const badRequest = (
  errorMessage: string,
  headers: any = {},
  returnRawData: boolean = false,
): IResult => {
  return {
    statusCode: status.clientError.badRequest,
    headers: { ...headers, ...corsHeaders },
    body: returnRawData ? errorMessage : JSON.stringify({ errorMessage }),
  };
};

const unauthorized = (
  errorMessage: string,
  headers: any = {},
  returnRawData: boolean = false,
): IResult => {
  return {
    statusCode: status.clientError.unauthorized,
    headers: { ...headers, ...corsHeaders },
    body: returnRawData ? errorMessage : JSON.stringify({ errorMessage }),
  };
};

const forbidden = (
  errorMessage: string,
  headers: any = {},
  returnRawData: boolean = false,
): IResult => {
  return {
    statusCode: status.clientError.forbidden,
    headers: { ...headers, ...corsHeaders },
    body: returnRawData ? errorMessage : JSON.stringify({ errorMessage }),
  };
};

const notFound = (
  errorMessage: string,
  headers: any = {},
  returnRawData: boolean = false,
): IResult => {
  return {
    statusCode: status.clientError.notFound,
    headers: { ...headers, ...corsHeaders },
    body: returnRawData ? errorMessage : JSON.stringify({ errorMessage }),
  };
};

const unprocessable = (
  errorMessage: string,
  headers: any = {},
  returnRawData: boolean = false,
): IResult => {
  return {
    statusCode: status.clientError.unprocessable,
    headers: { ...headers, ...corsHeaders },
    body: returnRawData ? errorMessage : JSON.stringify({ errorMessage }),
  };
};

const serverError = (
  errorMessage: string,
  headers: any = {},
  returnRawData: boolean = false,
): IResult => {
  return {
    statusCode: status.serverError.internal,
    headers: { ...headers, ...corsHeaders },
    body: returnRawData ? errorMessage : JSON.stringify({ errorMessage }),
  };
};

export const response = {
  success,
  failure,
  ok,
  created,
  accepted,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  unprocessable,
  serverError,
};
