import { useState } from 'react';

export type UserNumberValue = ReturnType<typeof useNumber>[0];
export type UserNumberSetValue = ReturnType<typeof useNumber>[1];

const useNumber = (initialNumber: number) => useState<number>(initialNumber);

export default useNumber;
