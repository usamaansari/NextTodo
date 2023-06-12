import { TodoItem } from '@/components/ServerComponents';
import React, { Suspense } from 'react';
import AddTodoForm from './AddTodoForm';
import Todos from "./todos";

const page = () => {
  return (
    <div className="container">
        <AddTodoForm />

        <Suspense fallback={<div>loading...</div>}>
        <Todos />
      </Suspense>
    </div>
  )
}

export default page