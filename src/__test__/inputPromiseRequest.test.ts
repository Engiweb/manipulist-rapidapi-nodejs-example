/* eslint @typescript-eslint/ban-ts-ignore:0 */
import * as callManipulistApi from 'manipulist-rapidapi-query'
import inputPromiseRequest from '../inputPromiseRequest'

jest.mock('manipulist-rapidapi-query')

describe('inputPromiseRequest', () => {
  afterEach(() => jest.resetAllMocks())

  it('should return error message when params not valid', async () => {
    const endpoint = callManipulistApi.TOOL_ADD_INCREMENTAL_NUMBER
    const apiKey = 'longstringapikeylongstringapikeylongstringapikey'
    const input = undefined
    const param1 = 'wrong'
    const param2 = 'atStart'
    const lb = 'lf'

    // @ts-ignore
    callManipulistApi.default = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error('server error')))

    const output = await inputPromiseRequest({
      endpoint,
      apiKey,
      input,
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
    const input = 'Line1\nLine 2'
    const param1 = 3
    const param2 = 'atStart'
    const lb = 'lf'

    // @ts-ignore
    callManipulistApi.default = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: '1Line1\n2Line 2' }))

    const output = await inputPromiseRequest({
      endpoint,
      apiKey,
      input,
      param1,
      param2,
      lb,
    })

    expect(output).toEqual({
      data: '1Line1\n2Line 2',
    })
  })
})
