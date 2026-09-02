import { describe, expect, it } from 'vitest'
import { stackGroups } from './content'

describe('stack', () => {
  it('incluye AWS en Cloud & Infra', () => {
    const cloudGroup = stackGroups.find((group) => group.title === 'Cloud & Infra')

    expect(cloudGroup).toBeDefined()
    expect(cloudGroup?.items).toContain('AWS')
  })
})
