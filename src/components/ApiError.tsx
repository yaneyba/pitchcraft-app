import React from 'react';
import { ApiErrorProps } from '../types';

const ApiError: React.FC<ApiErrorProps> = ({ message }) => (
  <div className="bg-red-100 dark:bg-red-900/50 border border-red-500 text-red-700 dark:text-red-300 p-4 rounded-lg w-full max-w-2xl mt-4 text-center">
    <p><strong>Oops! Something went wrong.</strong></p>
    <p className="text-sm">{message}</p>
  </div>
);

export default ApiError;