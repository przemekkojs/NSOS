type EntityGenerator<T> = (overrides?: Partial<T>) => T

export interface FactoryFunction<T> extends EntityGenerator<T> {
  bulk: (count: number) => T[]
}

export function createFactory<T>(generator: EntityGenerator<T>): FactoryFunction<T> {
  const factory = generator as FactoryFunction<T>

  factory.bulk = function (count: number): T[] {
    const items: T[] = []
    for (let i = 0; i < count; i++) {
      items.push(generator())
    }
    return items
  }

  return factory
}
