import callManipulistApi from 'manipulist-rapidapi-query'
import {
  ManipulistApi,
  ManipulistResponse,
} from 'manipulist-rapidapi-query/@types/types'

const fileAsyncRequest = ({
  endpoint,
  apiKey,
  file,
  param1,
  param2,
  lb,
}: ManipulistApi): Promise<ManipulistResponse> =>
  callManipulistApi({
    endpoint,
    apiKey,
    file,
    param1,
    param2,
    lb,
  })
    .then((response) => response)
    .catch((e) => ({ error: e.message }))

export default fileAsyncRequest
