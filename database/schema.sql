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

CREATE TABLE "comments" (
	"commentId" serial NOT NULL,
	"id" serial NOT NULL,
	"comment" TEXT NOT NULL,
	"commentedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT "comments_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("id") REFERENCES "detox"("id");
