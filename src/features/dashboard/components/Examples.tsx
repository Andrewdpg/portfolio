import Card from '../../../components/Card'
import React from 'react'
import { LoadingBar } from '../../../components/LoadingBar'
import { Table, TableColumn } from '../../../components/Table'
import RichTextEditor from '../../../components/RichTextEditor'

type Data = {
  name: string
  age: number
}

export const Examples = () => {
  const columns: TableColumn<Data>[] = [
    {
      key: 'name',
      label: 'Name',
      render: (value, row) => <div>{row.name}</div>,
    },
    {
      key: 'age',
      label: 'Age',
      render: (value, row) => <div>{row.age}</div>,
    },
  ]

  const data: Data[] = [
    { name: 'John Doe', age: 25 },
    { name: 'Jane Doe', age: 22 },
  ]
  return (
    <Card className="flex flex-col flex-1 sm:w-5/12 p-4 gap-4  transition-all duration-300 ease-in-out">
      <h1 className="text-white text-2xl font-bold transition-all duration-300 ease-in-out">Examples</h1>
      <LoadingBar />
      <Table columns={columns} data={data} />
      <RichTextEditor value="" onChange={() => {}} />
    </Card>
  )
}
