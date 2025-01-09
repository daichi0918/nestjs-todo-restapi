### クラスバリデータをインストールするコマンド

```
npm i class-validator class-transformer
```

### コンテナ入るコマンド

```
docker exec -it postgres psql -U nestjsuser
todoapp
```

### prismaをインストールするコマンド

```
npm i prisma
```

### prismaの初期セットアップコマンド

```
npx prisma init
```

### dbマイグレーション

```
npx prisma migrate dev --name init
```

### prismaクライアントインストール

```
npm i @prisma/client
```

### prismaファイル作成コマンド

```
nest g module prisma
nest g service prisma --no-spec
```

### authフォルダ作成コマンド

```
nest g resource auth --no-spec
```

### userテーブル追加

```
npx prisma migrate dev --name addUser
```

### passportインストールコマンド

```
npm i passport @nestjs/passport
```

### jwtインストールコマンド

```
npm i passport-jwt @nestjs/jwt
```

### jwtのtypeインストールコマンド

```
npm i -D @types/passport-jwt
```

### 秘密鍵(JWT_SECRET)で使うランダムの文字列生成コマンド

```
openssl rand -hex 32
```
