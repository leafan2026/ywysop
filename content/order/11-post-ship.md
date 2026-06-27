---
id: "post-ship"
title: "九、线上发货后退换货"
sort: 110
status: "published"
---
<h2>九、线上发货后退换货</h2>
        <p>订单已 <span class="chip chip--state">已出库</span>，家长收到货后通过客服或自助表单申请退换；货物寄回 → 拆快递入库 → 审核 → 库存回仓。</p>

        <h3>9.1 内部发起</h3>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">工作人员（客服 / 业务 / 管家）通过内部表单为家长发起退换。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">内部退换货申请表</span></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li><span class="chip chip--btn">记录</span> 新建 <span class="arrow">→</span> 用收件电话搜订单 <span class="arrow">→</span> 选择订单。</li>
                <li>在 <span class="chip chip--field">选择商品出库单明细</span> 中勾选要退换的商品。</li>
                <li>填申请数量、退换类型（退款 / 换货）、换货新尺码信息。</li>
                <li><span class="chip chip--btn">发起审批</span>。</li>
                <li><span class="auto">生成 <span class="chip chip--sheet">退换货明细审核</span></span>。</li>
              </ol>
            </div>
          </div>
        </div>

        <h3>9.2 家长发起</h3>
        <p>家长通过自助表单提交，流程：家长提交 → 管家初审 → 业务终审 → 点对应按钮。审核位置：<span class="chip chip--sheet">退换货明细审核</span>。</p>

        <div class="link-card">
          <div class="link-card-text"><strong>在之间</strong>　家长自助退换货入口</div>
          <a href="https://7ca52dc171d38539.share.mingdao.net/public/form/c1d688f561eb4dc1b9d4baf494ca247c" target="_blank" rel="noopener">打开表单 →</a>
        </div>

        <h4>《退换货明细审核》两个特殊按钮</h4>
        <div class="tbl">
          <table>
            <thead><tr><th>按钮</th><th>用途</th><th>行为</th></tr></thead>
            <tbody>
              <tr>
                <td><span class="chip chip--btn">审核不通过</span></td>
                <td>类似删除退换货申请工单</td>
                <td>操作有误需重提一条新申请；若退款已完成，<strong>不会产生任何影响</strong></td>
              </tr>
              <tr>
                <td><span class="chip chip--btn">审核通过→待审核</span></td>
                <td>退回已通过的申请</td>
                <td>① 还原原单出库状态；② 删除负收入；③ 没退款 → <span class="auto">自动删退款单</span>；④ 财务已退款 → 点按钮不会变化，<strong>先和财务确认</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>9.3 退换货回仓判定</h3>
        <p>快速库存判定锁库存后，退换货时系统默认释放到大仓。但"学校仓扣货"和"学校仓拆换标"场景下，统一释放到大仓会让学校仓账实不符。本步加人工判断，必要时由系统生成虚拟移仓单把库存释放回正确仓库。</p>

        <h4>四种扣货形式 vs 是否触发判断</h4>
        <div class="tbl">
          <table>
            <thead><tr><th>扣货类型</th><th>出库状态</th><th>指定发货仓库</th><th>其他特征</th><th>触发判断?</th></tr></thead>
            <tbody>
              <tr><td>大仓扣货</td><td><span class="chip chip--state">锁库存</span></td><td>空</td><td>—</td><td><span class="chip chip--state" style="border-color: var(--ink-30); color: var(--ink-48);">否</span></td></tr>
              <tr><td><strong>学校仓扣货</strong></td><td><span class="chip chip--state">锁库存</span></td><td>学校仓名</td><td>有移仓明细</td><td><span class="chip chip--state">是</span></td></tr>
              <tr><td>大仓拆换标</td><td><span class="chip chip--state">锁库存</span></td><td>空</td><td>拆换标备注 + 入库明细</td><td><span class="chip chip--state" style="border-color: var(--ink-30); color: var(--ink-48);">否</span></td></tr>
              <tr><td><strong>学校仓拆换标</strong></td><td><span class="chip chip--state">锁库存</span></td><td>学校仓名</td><td>拆换标备注 + 移仓明细</td><td><span class="chip chip--state">是</span></td></tr>
            </tbody>
          </table>
        </div>

        <h4>审核流程</h4>
        <div class="flow-canvas">
          <div class="flow">
            <span class="step step--terminal">退换货审核</span>
            <span class="line"></span>
            <span class="step step--stack">
              <span>系统判断扣货类型</span>
              <span class="step-sub">✦ 自动</span>
            </span>
            <div class="branches">
              <div class="branch">
                <span class="branch-label">不触发</span>
                <span class="line"></span>
                <span class="step step--muted">走 §9.1 / §9.2 / §十 正常流程</span>
              </div>
              <div class="branch">
                <span class="branch-label">触发</span>
                <span class="line"></span>
                <span class="step">弹窗 + 参考信息</span>
                <span class="line"></span>
                <span class="step step--decision">审核人选择</span>
                <div class="branches">
                  <div class="branch">
                    <span class="branch-label">未发</span>
                    <span class="line"></span>
                    <span class="step">释放到大仓</span>
                    <span class="line"></span>
                    <span class="step step--output">生成虚拟移仓单</span>
                    <span class="line"></span>
                    <span class="step step--stack">
                      <span>库存位置</span>
                      <span class="step-sub">学校仓</span>
                    </span>
                  </div>
                  <div class="branch">
                    <span class="branch-label">已发</span>
                    <span class="line"></span>
                    <span class="step">释放到大仓</span>
                    <span class="line"></span>
                    <span class="step step--stack">
                      <span>库存位置</span>
                      <span class="step-sub">大仓</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <span class="merge merge--xtall"></span>
            <span class="step step--terminal">记录判断信息</span>
          </div>
          <p class="flow-caption">✦ 系统自动记录判断人 / 时间 / 依据</p>
        </div>

        <h4>虚拟移仓单字段</h4>
        <div class="tbl">
          <table>
            <thead><tr><th>字段</th><th>取值</th></tr></thead>
            <tbody>
              <tr><td><span class="chip chip--field">移出仓库</span></td><td>大仓</td></tr>
              <tr><td><span class="chip chip--field">移入仓库</span></td><td>原单「指定发货仓库」</td></tr>
              <tr><td>SKU / 数量</td><td>退换货明细</td></tr>
              <tr><td><span class="chip chip--field">备注</span></td><td><code style="font-family: var(--font-mono); font-size: 13px;">退换货自动回库_单号_判断人_时间</code></td></tr>
              <tr><td>状态</td><td>直接完成</td></tr>
              <tr><td>标识</td><td>虚拟移仓</td></tr>
            </tbody>
          </table>
        </div>
        <div class="notice"><strong>虚拟移仓单只调整账面，不产生实际物流</strong>。</div>

        <h3>9.4 拆快递入库</h3>
        <p>货物寄回后由仓库拆包、录入系统。</p>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">仓库收到家长寄回的退换货快递。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body">多入口：<span class="chip chip--sheet">总表快递到货确认</span>、<span class="chip chip--sheet">仓库退换货审批和无字条处理</span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>填写 <span class="chip chip--sheet">拆快递记录单</span>。</li>
                <li><span class="chip chip--btn">核对退换货明细</span> <span class="arrow">→</span> <span class="auto">自动匹配</span>。</li>
                <li>进入「财务应用」<span class="arrow">→</span> <span class="chip chip--sheet">入库单</span> <span class="arrow">→</span> <span class="chip chip--btn">记录</span>：
                  <ul>
                    <li>左侧"拆快递"关联今天拆快递的快递单号。</li>
                    <li><span class="chip chip--btn">拆快递入库明细生成</span>。</li>
                    <li>核对入库数量汇总和拆快递应入库总数。</li>
                    <li>确认后入库状态改 <span class="chip chip--state">已入库</span>。</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
          <div class="op-row">
            <span class="op-label">结果</span>
            <div class="op-body"><span class="auto">自动按检索号 + 尺码匹配退换货明细</span>。</div>
          </div>
          <div class="op-row">
            <span class="op-label">异常</span>
            <div class="op-body">无字条商品 → <span class="chip chip--sheet">仓库退换货审批和无字条处理</span> 中 <span class="chip chip--view">还没&lt;关联退换货明细&gt;</span> → <span class="chip chip--btn">更新关联</span> 自动关联。</div>
          </div>
        </div>

        <h3>9.5 拆快递一键审批</h3>
        <p>系统自动按检索号 + 尺码核对退换货明细，减少仓库人员手动比对工作。原来"查询 → 核对 → 审批"三步，现在 <span class="auto">系统自动匹配</span> → 一键通过。</p>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">拆快递入库完成，需要审批退换货明细。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span>订单管理 <span class="arrow">→</span> 仓库相关 <span class="arrow">→</span> <span class="chip chip--sheet">快递到货确认</span> <span class="arrow">→</span> <span class="chip chip--view">退换货审批</span></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body"><span class="chip chip--btn">退换审核通过</span></div>
          </div>
          <div class="op-row">
            <span class="op-label">异常</span>
            <div class="op-body">
              <div class="tbl">
                <table>
                  <thead><tr><th>异常</th><th>触发条件</th><th>系统处理</th><th>人工</th></tr></thead>
                  <tbody>
                    <tr><td>数量不符</td><td>实收 ≠ 申请数</td><td>红色提示 + 禁止审批</td><td>联系客户确认</td></tr>
                    <tr><td>无匹配记录</td><td>找不到对应退换货单</td><td>蓝色提示</td><td>人工查询</td></tr>
                    <tr><td>重复入库</td><td>快递单号已处理</td><td>禁止操作</td><td>核实是否误操作</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
