---
id: "ship"
title: "六、商品出库"
sort: 80
status: "published"
---
<h2>六、商品出库</h2>
        <p>把"等待出库"的订单变成"已出库"——根据是否填写收件地址，分送校与邮寄两条路径。</p>

        <h3>6.1 送校 / 邮寄判定</h3>
        <p>触发：订单 <span class="chip chip--state">等待出库</span>，需决定走送校还是邮寄。位置：<span class="chip chip--sheet">销售订单</span> / 合单判定结果。</p>
        <div class="tbl">
          <table>
            <thead><tr><th>条件</th><th>走法</th></tr></thead>
            <tbody>
              <tr><td>没有写收件地址</td><td>送校（6.2）</td></tr>
              <tr><td>写了收件地址 + 销售非售后出库 + 合单判定"已付快递费"</td><td>邮寄正常发货</td></tr>
              <tr><td>写了收件地址 + 销售非售后出库 + 合单判定"未付快递费"</td><td>邮寄到付（<span class="chip chip--field">是否邮寄到付</span> = 是）</td></tr>
            </tbody>
          </table>
        </div>
        <div class="notice">合单判定时 <span class="auto">系统会自动判断客户是否付了快递费</span>，对应到 <span class="chip chip--field">是否邮寄到付</span> 字段。</div>

        <h3>6.2 送校出库 · 三选一</h3>
        <p>触发：配货 Excel 已发给仓库、商品已拣货完毕。位置见各方式。</p>
        <div class="tbl">
          <table>
            <thead><tr><th>方式</th><th>入口</th><th>前提 / 说明</th></tr></thead>
            <tbody>
              <tr>
                <td><strong>方式一<br>（推荐）</strong></td>
                <td><span class="chip chip--sheet">整单出库快速判定单</span> 填 <span class="chip chip--field">送校出库时间</span> <span class="arrow">→</span> <span class="chip chip--btn">送校订单一键出库 / 更新出库时间</span></td>
                <td>流程为 <span class="chip chip--state">配货资料生成完成</span></td>
              </tr>
              <tr>
                <td><strong>方式二<br>（未上线）</strong></td>
                <td><span class="chip chip--sheet">补充出库时间</span> 填渠道批次号 / 出库单序号 / 学校 / 时间 <span class="arrow">→</span> 执行</td>
                <td>立项后上线</td>
              </tr>
              <tr>
                <td><strong>方式三</strong></td>
                <td><span class="chip chip--sheet">商品出库单明细</span> 筛选 <span class="arrow">→</span> 批量改 <span class="chip chip--field">出库状态</span> 和 <span class="chip chip--field">出库时间</span></td>
                <td>手工兜底</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>6.3 邮寄出库 & 快递回传</h3>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">需要邮寄的订单出库；或仓库回传快递单号。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">快递信息</span></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>准备 Excel：必含 <span class="chip chip--field">原始 ISV</span>、<span class="chip chip--field">快递单号</span>、<span class="chip chip--field">出库时间</span>。</li>
                <li>进入 <span class="chip chip--sheet">快递信息</span> <span class="arrow">→</span> <span class="chip chip--btn">导入</span> <span class="arrow">→</span> 核对字段 <span class="arrow">→</span> <span class="chip chip--btn">开始导入</span>。</li>
                <li>选刚导入的数据 <span class="arrow">→</span> <span class="chip chip--btn">关联订单和出库信息</span>。</li>
                <li>检查 <span class="chip chip--view">出库时间为空的</span> 视图 → 正常应为空。</li>
              </ol>
            </div>
          </div>
          <div class="op-row">
            <span class="op-label">结果</span>
            <div class="op-body"><span class="auto">顺丰回传后系统自动同步出库时间 + 自动把 <span class="chip chip--state">准备出库</span> 改 <span class="chip chip--state">已出库</span></span>，不用手动改。</div>
          </div>
          <div class="op-row">
            <span class="op-label">异常</span>
            <div class="op-body">顺丰回传后仍有"出库时间为空"——数据缺失或快递单号未匹配，回第 3 步重关联。</div>
          </div>
        </div>

        <h3>6.4 家长自助查询</h3>
        <div class="link-card">
          <div class="link-card-text">
            家长输入手机号即可查 <strong>订单 · 状态 · 快递 · 预计到货时间</strong>。
          </div>
          <a href="https://7ca52dc171d38539.share.mingdao.net/public/query/667cd20b2a256e9d03dbc194" target="_blank" rel="noopener">打开查询页 →</a>
        </div>
