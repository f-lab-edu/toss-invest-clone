const REST = Deno.env.get("KIS_REST_BASE")!;
const APP  = Deno.env.get("KIS_APP_KEY")!;
const SEC  = Deno.env.get("KIS_APP_SECRET")!;

type TokenResponse = {
    access_token?: unknown;
};

type TradeVolumeRankingResponse = {
    output2?: unknown;
};

function jsonResponse(data: unknown, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });
}
function bad(message: string, status = 400, details?: unknown) {
    return jsonResponse({ ok: false, error: { message, details } }, status);
}

async function postAuthAccessTokenP(): Promise<string> {
    const res = await fetch(`${REST}/oauth2/tokenP`, {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({
            grant_type: "client_credentials",
            appkey: APP,
            appsecret: SEC,
        }),
    });
    if (!res.ok) throw new Error(`tokenP ${res.status}: ${await res.text()}`);
    const data = await res.json().catch((): TokenResponse => ({}));
    if (typeof data.access_token !== "string") throw new Error("No access_token");
    return data.access_token;
}

async function getOverseaStockTradeVolRanking(
    accessToken: string,
): Promise<TradeVolumeRankingResponse> {
    const url = `${REST}/uapi/overseas-stock/v1/ranking/trade-vol?EXCD=NYS&NDAY=1`; // 필요 파라미터만
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "content-type": "application/json; charset=utf-8",
            authorization: `Bearer ${accessToken}`,
            appkey: APP,
            appsecret: SEC,
            tr_id: "HHDFS76310010",
            custtype: "P",
        },
    });
    if (!res.ok) throw new Error(`trade-vol ${res.status}: ${await res.text()}`);
    return (await res.json()) as TradeVolumeRankingResponse;
}

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
            },
        });
    }

    try {
        const token = await postAuthAccessTokenP();// 토큰 발급(1분 제한)

        const data  = await getOverseaStockTradeVolRanking(token); // 외부 REST 호출

        return jsonResponse({ ok: true, data: data.output2 });
    } catch (err) {
        return bad("request failed", 500, String(err));
    }
});
