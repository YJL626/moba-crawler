declare interface PromiseConstructor {
  allSettled<value = unknown, reason = unknown>(
    promises: Array<Promise<T>>
  ): Promise<
    Array<{
      status: 'fulfilled' | 'rejected'
      value?: value
      reason?: reason
    }>
  >
}
