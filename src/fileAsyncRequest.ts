import callManipulistApi from 'manipulist-rapidapi-query'
import {
  ManipulistApi,
  ManipulistResponse,
} from 'manipulist-rapidapi-query/@types/types'

const fileAsyncRequest = async ({
  endpoint,
  apiKey,
  file,
  param1,
  param2,
  lb,
}: ManipulistApi): Promise<ManipulistResponse> => {
  try {
    const response = await callManipulistApi({
      endpoint,
      apiKey,
      file,
      param1,
      param2,
      lb,
    })

    return response
  } catch (e: any) {
    if (e?.message) {
      return { error: e?.message || 'Could not call api' }
    }

    return { error: 'Could not call api' }
  }
}

export default fileAsyncRequest
