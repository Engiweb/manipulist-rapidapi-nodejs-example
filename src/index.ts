import {
  FILE_TOOL_CONVERT_CASE,
  TOOL_ADD_INCREMENTAL_NUMBER,
} from 'manipulist-rapidapi-query'
import dotenv from 'dotenv'
import inputPromiseRequest from './inputPromiseRequest'
import fileAsyncRequest from './fileAsyncRequest'
import fs from 'fs'
import path from 'path'
import { ManipulistResponse } from 'manipulist-rapidapi-query/@types/types'
// import { File } from 'formdata-node'

dotenv.config()

const start = async (): Promise<void> => {
  const apiKey = process.env.RAPID_API_KEY

  // try request with input
  inputPromiseRequest({
    endpoint: TOOL_ADD_INCREMENTAL_NUMBER,
    apiKey,
    input: 'Line 1\nLine 2\nLine3\nLine 4',
    param1: 1,
    param2: 'atStart',
    lb: 'lf',
  }).then((response: ManipulistResponse): void =>
    console.log({
      type: 'input-promise',
      response,
    })
  )

  // try request with file and async/await
  const filePath = path.join(__dirname, '../fixtures/sample.txt')

  // import from file
  const file = fs.createReadStream(filePath)

  // generate file from string
  // const inputText = 'Line 1\nLine 2\nLine 3\nLine 4'
  // const file = new File([inputText], 'file.txt')

  const response = await fileAsyncRequest({
    endpoint: FILE_TOOL_CONVERT_CASE,
    apiKey,
    file,
    param1: 'camelCase',
    lb: 'lf',
  })

  console.log({
    type: 'file-async',
    response,
  })
}

start()
