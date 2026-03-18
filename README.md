
# 💼 Portfólio - Fullstack App

<img width="1864" height="888" alt="image" src="https://github.com/user-attachments/assets/9bf42991-cd32-4b30-a215-2a8151f42144" />

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
* [ ] Funcionalidade para alterar qualquer texto do site via pagina de Admin
* [ ] Internacionalização

---

## 📷 Preview

<img width="1864" height="888" alt="image" src="https://github.com/user-attachments/assets/9bf42991-cd32-4b30-a215-2a8151f42144" />
<img width="1861" height="892" alt="image" src="https://github.com/user-attachments/assets/ba42ce5b-8ce3-42e6-90ad-b88ea2f9b970" />
<img width="1847" height="885" alt="image" src="https://github.com/user-attachments/assets/a277429e-a765-4d1a-adaf-d99a1b638543" />
<img width="1051" height="812" alt="image" src="https://github.com/user-attachments/assets/e8b232e6-875b-4882-acd6-41b5fd1b3bab" />
<img width="691" height="762" alt="image" src="https://github.com/user-attachments/assets/2f21f45f-040b-4504-8db9-ee8292e822dd" />
<img width="600" height="983" alt="image" src="https://github.com/user-attachments/assets/56f30b46-ff63-40ad-8bfe-f99ab558b9d7" />
<img width="644" height="720" alt="image" src="https://github.com/user-attachments/assets/cbf3dee8-6716-4111-a0bb-3b114a47e815" />
<img width="653" height="686" alt="image" src="https://github.com/user-attachments/assets/8a790f92-be69-4451-9a55-d43818b3372c" />




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

