CREATE TABLE "detox" (
  "id" serial NOT NULL,
	"username" TEXT NOT NULL,
	"detox" TEXT NOT NULL,
	"duration" TEXT NOT NULL,
	"plan" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT "detox_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
