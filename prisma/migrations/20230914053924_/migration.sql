-- CreateTable
CREATE TABLE "Cadastro" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Cadastro_pkey" PRIMARY KEY ("id")
);
