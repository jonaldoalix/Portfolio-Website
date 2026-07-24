import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { defaultContent } from "../src/content";

const projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT;

async function main() {
  if (!projectId) {
    throw new Error(
      "Set GOOGLE_CLOUD_PROJECT (or GCLOUD_PROJECT) to your Firebase project id.",
    );
  }

  initializeApp({
    credential: applicationDefault(),
    projectId,
  });

  const db = getFirestore();
  const ref = db.collection("portfolio").doc("published");
  const existing = await ref.get();
  const previousVersion = existing.exists
    ? Number(existing.data()?.version || 0)
    : 0;

  const payload = {
    ...defaultContent,
    version: previousVersion + 1,
    updatedAt: new Date().toISOString(),
  };

  await ref.set(payload, { merge: false });
  console.log(
    `Seeded portfolio/published (version ${payload.version}) in project ${projectId}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
