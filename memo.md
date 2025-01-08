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
