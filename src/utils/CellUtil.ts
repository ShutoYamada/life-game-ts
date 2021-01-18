/**
 * 与えられた設定情報からランダムなアクティブセル座標リストを返却する
 * @param rowCount 行数(N*N)
 * @param defaultActiveCount アクティブなセル数
 */
export const generateRandomActiveCellPoint = (rowCount: number, defaultActiveCount): {x: number, y: number}[] => {
    let result: {x: number, y: number}[] = [];
    if(rowCount < 1 || !defaultActiveCount) return [];

    // 目的のアクティブセル数に達するまで処理を繰り返す
    while(result.length < defaultActiveCount){
        // ランダムなx,yを生成
        const randomX: number = Math.floor(Math.random() * Math.floor(rowCount));
        const randomY: number = Math.floor(Math.random() * Math.floor(rowCount));

        // 被っているかチェック
        const isDuplicate: boolean = !!result.find((r) => { return r.x === randomX && r.y === randomY });
        if(!isDuplicate) {
            result.push({
                x: randomX,
                y: randomY
            })
        }
    }

    return result;
}