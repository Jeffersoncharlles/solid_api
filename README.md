# solid_api

<div align="center">
  <a href="https://opensource.org/licenses/MIT"><img alt="License MIT" src="https://img.shields.io/badge/license-MIT-brightgreen"></a>
</div>

<p align="center">
  <a href="#interrobang-what-is-inter">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Technologies used</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#construction_worker-how-to-use-developing">How to portfolio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#key-license">License</a>
</p>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev

```

# App GynPass

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível obter o numero de check-ins realizados pelo usuário logado
- [x] Deve ser possível obter o usuário obter seu histórico de check-ins
- [ ] Deve ser possível o usuário buscar academias próximas
- [x] Deve ser possível o usuário buscar academias pelo nome
- [x] Deve ser possível o usuário realizar  check-in em uma academia
- [ ] Deve ser possível validar check-in de um usuário
- [x] Deve ser possível cadastrar uma academia

## RNs (Regras de negocio)

- [x] O usuário não deve poder se cadastrar com um email duplicado
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [ ] O check-in so pode ser validado ate 20 minutos apos criado
- [ ] O check-in so pode ser validado por administradores
- [ ] A academia so pode ser cadastrada por administradores

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografadas
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL
- [x] Todos listas de dados precisam estar paginas com 20 itens por pagina
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)


## 🚀 Technologies:

This Back-End project was developed using the following technologies:


-   [Typescript][typescript]
-   [Fastify][fastify]
-   [Prisma][prisma]
-   [Zod][zod]
-   [Dot env][dotenv]
-   [BcryptJs][bcryptjs]
-   [Vitest][vitest]
-   [SuperTest][supertest]
-   [TsUp][tsup]




<div align='center'>
This project in under MIT license, for more details check in [LICENSE][license]. <br>
Feel free to bring new features or fix problems, it will be a pleasure! 💜
  Made with 💚  by <strong>Jefferson Charlles</strong> 🔥
  <a href='https://www.linkedin.com/in/jeffersoncharlles/'>Get in touch!</a>
</div>

[typescript]: https://www.typescriptlang.org/
[fastify]: https://www.fastify.io/
[supertest]: https://www.npmjs.com/package/supertest
[tsup]: https://tsup.egoist.dev/
[knex]: https://knexjs.org/
[dotenv]: https://www.npmjs.com/package/dotenv
[bcryptjs]: https://github.com/dcodeIO/bcrypt.js
[tailwindcss]: https://tailwindcss.com/
[clsx]: https://github.com/lukeed/clsx#readme
[nativewind]: https://www.nativewind.dev/
[prisma]: https://www.prisma.io/
[nextjs]: https://nextjs.org/
[dayjs]: https://day.js.org/
[expo]: https://expo.dev/
[zod]: https://zod.dev/
[radix-ui]: https://www.radix-ui.com/
[reactnative]: https://reactnative.dev/
[reactnavigation]: https://reactnavigation.org/
[osanimation]: https://michalsnik.github.io/aos/
[swiperjs]: https://swiperjs.com/react
[next-auth]: https://next-auth.js.org/
[vitejs]: https://vitejs.dev/
[vitest]: https://vitest.dev/
[styled]: https://styled-components.com/
[phosphoricons]: https://phosphoricons.com/
[react-hook-form]: https://react-hook-form.com/
[sass]: https://sass-lang.com/
[axios]: https://axios-http.com/docs/intro
[prismic]: https://prismic.io/
[stripe]: https://stripe.com/br
[react-icons]: https://react-icons.github.io/react-icons/
[git]: https://git-scm.com
[fauna]: https://fauna.com/
[yarn]: https://yarnpkg.com/
[license]: ./LICENSE
[linkedin]: https://www.linkedin.com/in/jeffersoncharlles/

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://jefferdeveloper.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/jeffersoncharlles)
