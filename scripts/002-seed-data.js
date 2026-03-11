import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function seed() {
  // Seed sermons
  console.log('Seeding sermons...');
  const sermons = [
    { series: '사무엘상', date: '2026-03-02', title: '사무엘상 7; 성도다움: 믿음과 순종의 길', scripture: '사무엘상 7:1-17', pastor: '손유진 목사', youtube_url: '' },
    { series: '사무엘상', date: '2026-02-23', title: '사무엘상 6; 하나님이 일하실 때 드러나는 성도다움', scripture: '사무엘상 6:1-21', pastor: '손유진 목사', youtube_url: '' },
    { series: '사무엘상', date: '2026-02-16', title: '사무엘상 5; 하나님의 영광이 머무는 성도다움', scripture: '사무엘상 5:1-12', pastor: '손유진 목사', youtube_url: '' },
    { series: '사무엘상', date: '2026-02-09', title: '사무엘상 4; 말씀 앞에서 드러나는 성도다움', scripture: '사무엘상 4:1-22', pastor: '손유진 목사', youtube_url: '' },
    { series: '사무엘상', date: '2026-02-02', title: '사무엘상 3; 성도다운 가정', scripture: '사무엘상 3:1-21', pastor: '손유진 목사', youtube_url: '' },
    { series: '사무엘상', date: '2026-01-25', title: '사무엘상 2; 하나님의 응답 앞에서 드러나는 성도다움', scripture: '사무엘상 2:1-36', pastor: '손유진 목사', youtube_url: '' },
    { series: '사무엘상', date: '2026-01-18', title: '사무엘상 1; History: His Story', scripture: '사무엘상 1:1-28', pastor: '손유진 목사', youtube_url: '' },
    { series: '', date: '2026-01-11', title: '예수님의 가장 두려운 경고', scripture: '마태복음 7:21-23', pastor: '손유진 목사', youtube_url: '' },
    { series: '', date: '2026-01-04', title: '능력은 자리가 아니라 예수의 이름에 있습니다', scripture: '사도행전 3:1-10', pastor: '손유진 목사', youtube_url: '' },
    { series: '', date: '2025-12-28', title: '주님을 믿는 성도다운 생활', scripture: '골로새서 1:10', pastor: '손유진 목사', youtube_url: '' },
    { series: '', date: '2025-12-21', title: '성탄의 기쁨', scripture: '누가복음 2:1-20', pastor: '손유진 목사', youtube_url: '' },
  ];

  for (const s of sermons) {
    await sql`INSERT INTO sermons (series, date, title, scripture, pastor, youtube_url) VALUES (${s.series}, ${s.date}, ${s.title}, ${s.scripture}, ${s.pastor}, ${s.youtube_url})`;
  }
  console.log(`Seeded ${sermons.length} sermons`);

  // Seed calendar events for March 2026
  console.log('Seeding calendar events...');
  const events = [
    { title: '주일예배', date: '2026-03-01', category: 'church' },
    { title: '새벽기도회', date: '2026-03-03', category: 'church' },
    { title: '새벽기도회', date: '2026-03-04', category: 'church' },
    { title: '새벽기도회', date: '2026-03-05', category: 'church' },
    { title: '새벽기도회', date: '2026-03-06', category: 'church' },
    { title: '주일예배', date: '2026-03-08', category: 'church' },
    { title: '새벽기도회', date: '2026-03-10', category: 'church' },
    { title: '새벽기도회', date: '2026-03-11', category: 'church' },
    { title: '새벽기도회', date: '2026-03-12', category: 'church' },
    { title: '새벽기도회', date: '2026-03-13', category: 'church' },
    { title: '주일예배', date: '2026-03-15', category: 'church' },
    { title: '새벽기도회', date: '2026-03-17', category: 'church' },
    { title: '새벽기도회', date: '2026-03-18', category: 'church' },
    { title: '새벽기도회', date: '2026-03-19', category: 'church' },
    { title: '새벽기도회', date: '2026-03-20', category: 'church' },
    { title: '주일예배', date: '2026-03-22', category: 'church' },
    { title: '새벽기도회', date: '2026-03-24', category: 'church' },
    { title: '새벽기도회', date: '2026-03-25', category: 'church' },
    { title: '새벽기도회', date: '2026-03-26', category: 'church' },
    { title: '새벽기도회', date: '2026-03-27', category: 'church' },
    { title: '주일예배', date: '2026-03-29', category: 'church' },
    { title: '새벽기도회', date: '2026-03-31', category: 'church' },
  ];

  for (const e of events) {
    await sql`INSERT INTO calendar_events (title, date, category) VALUES (${e.title}, ${e.date}, ${e.category})`;
  }
  console.log(`Seeded ${events.length} calendar events`);

  // Seed church news
  console.log('Seeding church news...');
  await sql`INSERT INTO church_news (date, title, content) VALUES ('2026-03-01', '3월 1일 주일예배 교회소식', '{"items":["교회 소식 내용이 여기에 표시됩니다."],"bibleReading":"민수기 1-4장"}')`;
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

  console.log('All seed data inserted successfully!');
}

seed().catch(console.error);
