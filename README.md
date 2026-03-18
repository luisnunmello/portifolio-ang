
# 💼 Portfólio - Fullstack App

Aplicação de portfólio desenvolvida com arquitetura **Fullstack**, contendo:

- 🎨 Frontend em `client`
- ⚙️ Backend em `server`

O objetivo do projeto é apresentar projetos, habilidades e informações profissionais de forma moderna e organizada.

### Veja o projeto rodando no site https://luisnmello.com.br/

---

## 🚀 Tecnologias utilizadas

### Frontend (`client`)
- Angular
- TypeScript
- TailwindCSS / CSS
- PrimeIcons

### Backend (`server`)
- Java
- Spring Boot
- Spring Security
- PostgreSQL

---

## 📁 Estrutura do projeto

```

/
├── client/   # Frontend Angular
├── server/   # Backend Spring Boot
└── README.md

````

---

## ⚙️ Como rodar o projeto

### 🔹 Pré-requisitos

- Node.js (v18+ recomendado)
- Angular CLI
- Java 17+
- Maven ou Gradle
- PostgreSQL

---

## ▶️ Rodando o Frontend

```bash
cd client
npm install
ng serve
````

Acesse em:
👉 [http://localhost:3010](http://localhost:3010)

---

## ▶️ Rodando o Backend

Inicie o aplicativo springboot

```bash
cd server
./mvnw spring-boot:run
```

Ou, se usar Maven instalado:

```bash
mvn spring-boot:run
```

A API estará disponível em:
👉 [http://localhost:8080](http://localhost:8080)

---

## 🔐 Configurações

No backend, renomeie o arquivo application.properties.template para application.properties e o configure:

```
server/src/main/resources/application.properties.template
```

Exemplo:

```properties
spring.application.name=portifolio
spring.datasource.url=jdbc:postgresql://localhost:5432/portifolio
spring.datasource.username=postgres
spring.datasource.password=123
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.hibernate.ddl-auto=update

spring.devtools.livereload.enabled=true
server.port=8080

# OPICIONAIS (integração discord)
discord.channel = (id canal discord)
discord.user = (id usuario para pingar no discord)
discord.token = (token do bot no discord)
```

E também crie um banco de dados para o portifólio no PostgreSQL

```sql
CREATE DATABASE portifolio;
```

---

## 📌 Funcionalidades

* Exibição de informações pessoais e profissionais
* Integração com Discord para contato
* Sistema de autenticação de admin
* CRUD de projetos e Habilidades

---

## 🛠️ Melhorias futuras

* [ ] Testes Unitários
* [ ] Alterar todos textos do portifólio
* [ ] Internacionalização

---

## 📷 Preview

*(adicione prints aqui depois)*

---

## 🤝 Contribuição

Contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/minha-feature`)
3. Commit (`git commit -m 'feat: minha feature'`)
4. Push (`git push origin minha-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 👨‍💻 Autor

Desenvolvido por Luís Eduardo

