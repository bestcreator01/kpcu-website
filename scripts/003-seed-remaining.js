import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function seed() {
  // Seed church news (fix: use correct columns)
  console.log('Seeding church news...');
  const announcements = JSON.stringify(["교회 소식 내용이 여기에 표시됩니다."]);
  await sql`INSERT INTO church_news (date, title, announcements, bible_reading) VALUES ('2026-03-01', '3월 1일 주일예배 교회소식', ${announcements}, '민수기 1-4장')`;
  console.log('Seeded 1 church news');

  // Seed album
  console.log('Seeding album...');
  const photos = JSON.stringify([
    { src: '/images/album/installation/thumbnail.jpg', alt: '단체 사진' },
    { src: '/images/album/installation/JIN06225.jpg', alt: '축사' },
    { src: '/images/album/installation/JIN06228.jpg', alt: '축하 화환' },
    { src: '/images/album/installation/JIN06231.jpg', alt: '위임식 진행' },
    { src: '/images/album/installation/JIN06253.jpg', alt: '안수 기도' },
    { src: '/images/album/installation/JIN06259.jpg', alt: '안수 기도 단체' },
    { src: '/images/album/installation/JIN06287.jpg', alt: '설교' },
    { src: '/images/album/installation/JIN06297.jpg', alt: '손유진 목사님 설교' },
    { src: '/images/album/installation/JIN06304.jpg', alt: '성찬식' },
    { src: '/images/album/installation/JIN06327.jpg', alt: '예배 전경' },
  ]);
  await sql`INSERT INTO albums (title, date, thumbnail_url, photos) VALUES ('손유진 목사님 위임 예배', '2025-09-01', '/images/album/installation/thumbnail.jpg', ${photos})`;
  console.log('Seeded 1 album');

  console.log('All remaining seed data inserted successfully!');
}

seed().catch(console.error);
