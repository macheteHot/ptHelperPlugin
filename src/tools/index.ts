/**
 * 休眠
 * @param time 休眠毫秒
 */
export function sleep(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
