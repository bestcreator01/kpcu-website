import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function restore() {
  console.log('Updating March 1 church news with full content...');

  const announcements = JSON.stringify([
    "3월 2일(주일) 오후 4시 - 구역 예배가 있습니다. 각 구역별로 모임 장소를 확인해 주시기 바랍니다.",
    "3월 5일(수) 저녁 7시 - 수요 기도회에 함께해 주세요.",
    "3월 8일(토) 오전 6시 - 토요 새벽기도회가 있습니다. 많은 참여 부탁드립니다.",
    "성경 1독 프로젝트에 동참해 주세요. 이번 주 읽기표를 참고하시어 꾸준히 말씀을 읽어가시기 바랍니다.",
    "새가족을 위한 환영의 시간이 예배 후 친교실에서 있습니다. 처음 오신 분들을 따뜻하게 맞이해 주세요.",
    "교회 주차장 이용 시 이웃 건물 주차 구역을 사용하지 않도록 협조 부탁드립니다."
  ]);

  const bibleReading = "월: 민 1-2장 / 화: 민 3-4장 / 수: 민 5-6장 / 목: 민 7장 / 금: 민 8-9장 / 토: 민 10-11장";

  await sql`
    UPDATE church_news 
    SET announcements = ${announcements}, bible_reading = ${bibleReading}
    WHERE title = '3월 1일 주일예배 교회소식'
  `;

  console.log('March 1 church news restored with full announcements and bible reading!');
}

restore().catch(console.error);
