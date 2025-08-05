import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('データベースの初期化を開始します...');

    // 既存データのクリーンアップ（開発環境のみ）
    await prisma.personHobby.deleteMany();
    await prisma.person.deleteMany();
    await prisma.hobby.deleteMany();

    // 趣味データの作成
    const hobbies = await Promise.all([
      prisma.hobby.create({ data: { name: 'スポーツ' } }),
      prisma.hobby.create({ data: { name: '音楽' } }),
      prisma.hobby.create({ data: { name: '料理' } }),
      prisma.hobby.create({ data: { name: '旅行' } }),
      prisma.hobby.create({ data: { name: '読書' } }),
      prisma.hobby.create({ data: { name: '映画鑑賞' } }),
      prisma.hobby.create({ data: { name: 'ガーデニング' } })
    ]);

    console.log('趣味データを作成しました:', hobbies.length + '件');

    // 人物データの作成
    const suzuki = await prisma.person.create({
      data: {
        name: 'Suzuki',
        gender: '男性',
        job: '営業'
      }
    });

    const tanaka = await prisma.person.create({
      data: {
        name: 'Tanaka',
        gender: '女性',
        job: 'デザイナー'
      }
    });

    const yamada = await prisma.person.create({
      data: {
        name: 'Yamada',
        gender: '男性',
        job: 'エンジニア'
      }
    });

    const yamamoto = await prisma.person.create({
      data: {
        name: 'Yamamoto',
        gender: '女性',
        job: '教師'
      }
    });

    console.log('人物データを作成しました:', 4 + '件');

    // 趣味マップの作成（名前で検索しやすくするため）
    const hobbyMap = {};
    hobbies.forEach(hobby => {
      hobbyMap[hobby.name] = hobby.id;
    });

    // PersonHobby 中間テーブルのデータ作成
    const personHobbies = [
      // Suzuki: スポーツ、音楽
      { personId: suzuki.id, hobbyId: hobbyMap['スポーツ'] },
      { personId: suzuki.id, hobbyId: hobbyMap['音楽'] },
      
      // Tanaka: 料理、旅行
      { personId: tanaka.id, hobbyId: hobbyMap['料理'] },
      { personId: tanaka.id, hobbyId: hobbyMap['旅行'] },
      
      // Yamada: 読書、映画鑑賞
      { personId: yamada.id, hobbyId: hobbyMap['読書'] },
      { personId: yamada.id, hobbyId: hobbyMap['映画鑑賞'] },
      
      // Yamamoto: ガーデニング、読書
      { personId: yamamoto.id, hobbyId: hobbyMap['ガーデニング'] },
      { personId: yamamoto.id, hobbyId: hobbyMap['読書'] }
    ];

    await prisma.personHobby.createMany({
      data: personHobbies
    });

    console.log('PersonHobby関連データを作成しました:', personHobbies.length + '件');

    // データの確認
    const result = await prisma.person.findMany({
      include: {
        hobbies: {
          include: {
            hobby: true
          }
        }
      }
    });

    console.log('\n=== 作成されたデータ ===');
    result.forEach(person => {
      const hobbyNames = person.hobbies.map(ph => ph.hobby.name).join(', ');
      console.log(`${person.name}: ${person.gender}, ${person.job}, 趣味: ${hobbyNames}`);
    });

    console.log('\nデータベースの初期化が完了しました！');

  } catch (error) {
    console.error('エラーが発生しました:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });