CREATE TABLE "detox" (
  "id" serial NOT NULL,
	"username" TEXT NOT NULL,
	"detox" TEXT NOT NULL,
	"duration" TEXT NOT NULL,
	"notes" TEXT NOT NULL,
  CONSTRAINT "detox_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
