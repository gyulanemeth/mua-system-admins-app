import { describe, expect, test, vi } from 'vitest'
import { setActivePinia, createPinia, defineStore } from 'pinia'

import infiniteListState from '../state/infinite.js'

import createPatchOne from './patchOne.js'

describe('patchOne', () => {
  describe('Errors', () => {
    test('Not found in the store', async () => {
      setActivePinia(createPinia())
      const mockConnector = vi.fn().mockImplementation((params, body) => JSON.parse(JSON.stringify((body))))
      const mockOnError = vi.fn()

      const useStore = defineStore('patchOneTestList', {
        state: infiniteListState,
        actions: {
          patchOne: createPatchOne(mockConnector, mockOnError)
        }
      })

      const store = useStore()
      store.params = { param1: 'testparam', param2: 'testparam2' }
      store.items = [
        { _id: 1, status: 'ready', data: { _id: 1, name: 'first' }, errors: [] },
        { _id: 2, status: 'ready', data: { _id: 2, name: 'second' }, errors: [] },
        { _id: 3, status: 'ready', data: { _id: 3, name: 'third' }, errors: [] }
      ]

      expect(store.patchOne(4, { _id: 4, name: 'updated' })).rejects.toThrow(new Error('Item with _id: 4 was not found in the store.'))
      expect(mockOnError.mock.lastCall).toEqual([new Error('Item with _id: 4 was not found in the store.')])
      expect(store.status).toBe('encountered-an-error')
      expect(store.errors).toEqual([new Error('Item with _id: 4 was not found in the store.')])
    })

    test('Connector - pessimistic', async () => {
      setActivePinia(createPinia())
      const mockConnector = vi.fn().mockImplementation(async (params, body) => { throw new Error('mocked error') })
      const mockOnError = vi.fn()

      const useStore = defineStore('patchOneTestList', {
        state: infiniteListState,
        actions: {
          patchOne: createPatchOne(mockConnector, mockOnError)
        }
      })

      const store = useStore()
      store.params = { param1: 'testparam', param2: 'testparam2' }
      store.items = [
        { _id: 1, status: 'ready', data: { _id: 1, name: 'first' }, errors: [] },
        { _id: 2, status: 'ready', data: { _id: 2, name: 'second' }, errors: [] },
        { _id: 3, status: 'ready', data: { _id: 3, name: 'third' }, errors: [] }
      ]

      const resultPromise = store.patchOne(2, { _id: 2, name: 'updated' })
      expect(store.items[1].status).toBe('patch-in-progress')
      expect(store.items[1].data.name).toBe('second')
      expect(mockConnector.mock.lastCall).toEqual([{ param1: 'testparam', param2: 'testparam2', id: 2 }, { _id: 2, name: 'updated' }])

      try {
        await resultPromise
      } catch (e) {
        expect(e).toEqual(new Error('mocked error'))
      }

      expect(store.items[1].data.name).toBe('second')
      expect(store.items[1].status).toBe('encountered-an-error')
      expect(mockOnError.mock.lastCall).toEqual([new Error('mocked error')])
      expect(store.items[1].errors).toEqual([new Error('mocked error')])
    })

    test('Connector - optimistic', async () => {
      setActivePinia(createPinia())
      const mockConnector = vi.fn().mockImplementation(async (params, body) => { throw new Error('mocked error') })
      const mockOnError = vi.fn()

      const useStore = defineStore('patchOneTestList', {
        state: infiniteListState,
        actions: {
          patchOne: createPatchOne(mockConnector, mockOnError, { optimistic: true })
        }
      })

      const store = useStore()
      store.params = { param1: 'testparam', param2: 'testparam2' }
      store.items = [
        { _id: 1, status: 'ready', data: { _id: 1, name: 'first' }, errors: [] },
        { _id: 2, status: 'ready', data: { _id: 2, name: 'second' }, errors: [] },
        { _id: 3, status: 'ready', data: { _id: 3, name: 'third' }, errors: [] }
      ]

      const resultPromise = store.patchOne(2, { _id: 2, name: 'updated' })
      expect(store.items[1].status).toBe('ready')
      expect(store.items[1].data.name).toBe('updated')
      expect(mockConnector.mock.lastCall).toEqual([{ param1: 'testparam', param2: 'testparam2', id: 2 }, { _id: 2, name: 'updated' }])

      try {
        await resultPromise
      } catch (e) {
        expect(e).toEqual(new Error('mocked error'))
      }

      expect(store.items[1].data.name).toBe('second')
      expect(store.items[1].status).toBe('encountered-an-error')
      expect(mockOnError.mock.lastCall).toEqual([new Error('mocked error')])
      expect(store.items[1].errors).toEqual([new Error('mocked error')])
    })
  })

  describe('Success', () => {
    test('Pessimistic', async () => {
      setActivePinia(createPinia())
      const mockConnector = vi.fn().mockImplementation((params, body) => JSON.parse(JSON.stringify((body))))

      const useStore = defineStore('patchOneTestList', {
        state: infiniteListState,
        actions: {
          patchOne: createPatchOne(mockConnector)
        }
      })

      const store = useStore()
      store.params = { param1: 'testparam', param2: 'testparam2' }
      store.items = [
        { _id: 1, status: 'ready', data: { _id: 1, name: 'first', description: 'desc1' }, errors: [] },
        { _id: 2, status: 'ready', data: { _id: 2, name: 'second', description: 'desc2' }, errors: [] },
        { _id: 3, status: 'ready', data: { _id: 3, name: 'third', description: 'desc3' }, errors: [] }
      ]

      const resultPromise = store.patchOne(2, { name: 'updated' })
      expect(store.items[1].status).toBe('patch-in-progress')
      expect(store.items[1].data.name).toBe('second')

      const result = await resultPromise

      expect(mockConnector.mock.lastCall).toEqual([{ param1: 'testparam', param2: 'testparam2', id: 2 }, { name: 'updated' }])
      expect(store.items[1].status).toBe('ready')
      expect(store.items[1].data.name).toBe('updated')
      expect(store.items[1].data.description).toBe('desc2')
      expect(result).toEqual({ name: 'updated' })
    })

    test('Optimistic', async () => {
      setActivePinia(createPinia())
      const mockConnector = vi.fn().mockImplementation((params, body) => JSON.parse(JSON.stringify((body))))

      const useStore = defineStore('patchOneTestList', {
        state: infiniteListState,
        actions: {
          patchOne: createPatchOne(mockConnector, () => {}, { optimistic: true })
        }
      })

      const store = useStore()
      store.params = { param1: 'testparam', param2: 'testparam2' }
      store.items = [
        { _id: 1, status: 'ready', data: { _id: 1, name: 'first', description: 'desc1' }, errors: [] },
        { _id: 2, status: 'ready', data: { _id: 2, name: 'second', description: 'desc2' }, errors: [] },
        { _id: 3, status: 'ready', data: { _id: 3, name: 'third', description: 'desc3' }, errors: [] }
      ]

      const resultPromise = store.patchOne(2, { name: 'updated' })
      expect(store.items[1].status).toBe('ready')
      expect(store.items[1].data.name).toBe('updated')
      expect(store.items[1].data.description).toBe('desc2')

      const result = await resultPromise

      expect(mockConnector.mock.lastCall).toEqual([{ param1: 'testparam', param2: 'testparam2', id: 2 }, { name: 'updated' }])
      expect(store.items[1].status).toBe('ready')
      expect(store.items[1].data.name).toBe('updated')
      expect(store.items[1].data.description).toBe('desc2')
      expect(result).toEqual({ name: 'updated' })
    })
  })
})
