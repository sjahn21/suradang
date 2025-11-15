// 계산 로직 테스트 스크립트

function findOptimalDistribution(totalBoxes, minPerRow, maxPerRow) {
    let bestDistribution = null;
    let bestScore = -1;

    for (let boxesPerRow = minPerRow; boxesPerRow <= maxPerRow; boxesPerRow++) {
        const fullRows = Math.floor(totalBoxes / boxesPerRow);
        const lastRowBoxes = totalBoxes % boxesPerRow;
        const totalRows = lastRowBoxes > 0 ? fullRows + 1 : fullRows;

        let score = 0;

        if (lastRowBoxes === 0) {
            score = 1000;
        } else if (lastRowBoxes >= minPerRow && lastRowBoxes <= maxPerRow) {
            score = 900 + lastRowBoxes;
        } else {
            score = lastRowBoxes;
        }

        score -= totalRows * 0.1;

        if (score > bestScore) {
            bestScore = score;
            bestDistribution = {
                boxesPerRow,
                fullRows,
                lastRowBoxes,
                totalRows
            };
        }
    }

    return bestDistribution;
}

function testCase(name, totalQuantity, perBox, minPerRow, maxPerRow) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`테스트: ${name}`);
    console.log('='.repeat(60));
    console.log(`입력 - 총 떡 수량: ${totalQuantity.toLocaleString()}개`);
    console.log(`입력 - 상자당 떡: ${perBox}개`);
    console.log(`입력 - 줄당 상자 범위: ${minPerRow}~${maxPerRow}개`);

    const totalBoxes = Math.floor(totalQuantity / perBox);
    const remainingItems = totalQuantity % perBox;

    console.log(`\n계산 - 총 상자 개수: ${totalBoxes.toLocaleString()}개`);
    console.log(`계산 - 남은 떡: ${remainingItems}개`);

    const distribution = findOptimalDistribution(totalBoxes, minPerRow, maxPerRow);

    console.log(`\n결과:`);
    console.log(`  - 총 줄 수: ${distribution.totalRows}줄`);
    console.log(`  - 한 줄당 상자: ${distribution.boxesPerRow}개`);

    if (distribution.lastRowBoxes > 0) {
        console.log(`  - 완전한 줄: ${distribution.fullRows}줄 (${distribution.boxesPerRow}개씩)`);
        console.log(`  - 마지막 줄: ${distribution.lastRowBoxes}개`);
    } else {
        console.log(`  - 모든 줄 완전 배치: ${distribution.fullRows}줄 (${distribution.boxesPerRow}개씩)`);
    }

    console.log(`\n상세 배치:`);
    for (let i = 0; i < distribution.totalRows; i++) {
        const isLastRow = i === distribution.totalRows - 1;
        const boxesInRow = isLastRow && distribution.lastRowBoxes > 0 ? distribution.lastRowBoxes : distribution.boxesPerRow;
        const itemsInRow = boxesInRow * perBox;
        console.log(`  ${i + 1}줄: ${boxesInRow}상자 (${itemsInRow.toLocaleString()}개)`);
    }

    const totalPacked = totalBoxes * perBox;
    console.log(`\n총계:`);
    console.log(`  - 포장된 떡: ${totalPacked.toLocaleString()}개`);
    if (remainingItems > 0) {
        console.log(`  - 남은 떡: ${remainingItems}개 (상자 ${perBox - remainingItems}개 부족)`);
    }
}

// 테스트 실행
console.log('\n🧮 수라당 수량 계산기 - 로직 검증');
console.log('='.repeat(60));

// 테스트 케이스 1: 사용자 예시 1 (12,000개)
testCase('사용자 예시 1', 12000, 100, 20, 23);

// 테스트 케이스 2: 사용자 예시 2 (11,000개)
testCase('사용자 예시 2', 11000, 100, 20, 23);

// 테스트 케이스 3: 완전 배치 (10,000개)
testCase('완전 배치', 10000, 100, 20, 23);

// 테스트 케이스 4: 작은 수량 (2,000개)
testCase('작은 수량', 2000, 64, 20, 23);

// 테스트 케이스 5: 큰 수량 (50,000개)
testCase('큰 수량', 50000, 90, 20, 23);

// 테스트 케이스 6: 남은 떡이 있는 경우 (11,550개)
testCase('남은 떡 있음', 11550, 100, 20, 23);

console.log('\n' + '='.repeat(60));
console.log('✅ 모든 테스트 완료!');
console.log('='.repeat(60) + '\n');
