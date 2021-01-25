import CellInfo from '../modules/CellInfo';

/**
 * 与えられた設定情報からランダムなアクティブセル座標リストを返却する
 * @param rowCount 行数(N*N)
 * @param defaultActiveCount アクティブなセル数
 */
export const generateRandomActiveCellPoint = (rowCount: number, defaultActiveCount: number): {x: number, y: number}[] => {
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

/**
 * 現在のボードの状態から次世代のボード情報を生成する
 * @param cellRowList 現在のボード情報(のセル行リスト)
 */
export const nextGeneration = (cellRowList: CellInfo[][]): CellInfo[][] => {
    let result: CellInfo[][] = [];

    cellRowList.forEach((cellRow: CellInfo[], y: number, _self: CellInfo[][]) => {
        // 次世代セル行
        let nextCellRow: CellInfo[] = [];
        cellRow.forEach((cell: CellInfo, x: number) => {

            console.log(cell);
            // 隣接する3〜8マスを取得する
            const proximityCellList: CellInfo[] = _self.flat().filter((cell: CellInfo) => {
                return !(cell.x === x && cell.y === y) && (cell.x === x - 1 || cell.x === x || cell.x === x + 1) && (cell.y === y - 1 || cell.y === y || cell.y === y + 1);
            });

            // 次世代セルを生成
            const nextCell = new CellInfo(x,y, isActiveInNext(cell, proximityCellList.filter((c) => c.isActive).length));
            nextCellRow.push(nextCell);
        });

        result.push(nextCellRow);
    })

    return result;
}

/**
 * 対象セルとその周囲の生存セル数から次世代の状態を取得する
 * @param targetCell 対象セル
 * @param proximityActiveCellCount 対象セルの周囲の生存セル数
 */
export const isActiveInNext = (targetCell: CellInfo, proximityActiveCellCount: number): boolean => {
    let result: boolean = false;

    // 対象セルが生存
    if(targetCell.isActive) {
        // 周辺の生存セルが2もしくは3なら次世代でも生存
        if(proximityActiveCellCount === 2 || proximityActiveCellCount === 3) result = true;
        // 生存セルが1以下もしくは4以上ならそれぞれ過疎・過密で次世代では死亡
        if(proximityActiveCellCount <= 1 || proximityActiveCellCount >= 4) result = false;
    }
    // 対象セルが死亡
    else {
        // 周辺の生存セルがちょうど3なら次世代では誕生する
        if(proximityActiveCellCount === 3) result = true;
    }

    return result;
}