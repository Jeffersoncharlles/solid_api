import { Environment } from "vitest";

export default <Environment>{
  name: 'prisma',
  async setup() {
    console.log('executou')//antes dos test

    return {
     async teardown() {
        console.log('TearDown')
      },//depois dos test
    }
  }
}
