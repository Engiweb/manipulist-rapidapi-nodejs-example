/* eslint @typescript-eslint/ban-ts-ignore:0 */
import fs from 'fs'
import path from 'path'
import * as callManipulistApi from 'manipulist-rapidapi-query'
import fileAsyncRequest from '../fileAsyncRequest'

jest.mock('manipulist-rapidapi-query')

describe('fileAsyncRequest', () => {
  afterEach(() => jest.resetAllMocks())

  it('should return error message when params not valid', async () => {
    const endpoint = callManipulistApi.TOOL_ADD_INCREMENTAL_NUMBER
    const apiKey = 'longstringapikeylongstringapikeylongstringapikey'
    const file = undefined
    const param1 = 'wrong'
    const param2 = 'atStart'
    const lb = 'lf'

    // @ts-ignore
    callManipulistApi.default = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error('server error')))

    const output = await fileAsyncRequest({
      endpoint,
      apiKey,
      file,
      param1,
      param2,
      lb,
    })

    expect(output).toEqual({
      error: 'server error',
    })
  })

  it('should return error message when params not valid', async () => {
    const endpoint = callManipulistApi.TOOL_ADD_INCREMENTAL_NUMBER
    const apiKey = 'longstringapikeylongstringapikeylongstringapikey'
    const file = fs.readFileSync(
      path.join(__dirname, '../../fixtures/sample.txt')
    )
    const param1 = 3
    const param2 = 'atStart'
    const lb = 'lf'

    // @ts-ignore
    callManipulistApi.default = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: '1Line1\n2Line 2' }))

    const output = await fileAsyncRequest({
      endpoint,
      apiKey,
      file,
      param1,
      param2,
      lb,
    })

    expect(output).toEqual({
      data: '1Line1\n2Line 2',
    })
  })
})
