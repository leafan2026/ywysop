---
id: "inventory"
title: "三、库存判定"
sort: 50
status: "published"
---
<h2>三、库存判定</h2>
        <p>把订单分流到三种状态：<span class="chip chip--state">锁库存</span>（库存充足）/ <span class="chip chip--state">拆换标</span> / <span class="chip chip--state">调货中</span>（采购）。</p>
        <p><strong>拆换标</strong>：把其他商品的校标换成扣货商品的校标，让那件货顶上来用。是否能拆换由 <strong>业务初判 + 裁缝复核</strong> 决定。</p>

        <h3>3.1 发起整单出库快速判定</h3>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">订单审核通过、<span class="chip chip--field">出库状态</span> 为 <span class="chip chip--state">待判定</span>。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">商品出库单明细</span></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>选目标行 <span class="arrow">→</span> 把 <span class="chip chip--field">出库状态</span> 转 <span class="chip chip--state">库存判定中</span>。</li>
                <li><span class="chip chip--btn">填写库存判定单</span> <span class="arrow">→</span> 手动新建 <span class="chip chip--sheet">快速库存判定表</span> 并填齐字段。</li>
                <li>选判定模式（见 3.2）。</li>
                <li><span class="chip chip--btn">发起判定</span>。</li>
              </ol>
            </div>
          </div>
          <div class="op-row">
            <span class="op-label">结果</span>
            <div class="op-body">系统输出判定结果，按 3.3 分流。</div>
          </div>
          <div class="op-row">
            <span class="op-label">异常</span>
            <div class="op-body">核对 <span class="chip chip--field">需要判定数量</span> = <span class="chip chip--field">完成判定数量</span>。不相等 → 重做；多次仍不一致 → 群里 @ 李凡。</div>
          </div>
        </div>

        <h3>3.2 三种判定模式</h3>
        <div class="mode-grid">
          <div class="mode-card">
            <span class="mode-tag">模式 A</span>
            <h4>指定仓库优先</h4>
            <p>优先消耗某个仓的库存。例：力旺高中仓积压货。</p>
            <p class="mode-meta">
              <strong>步骤</strong>　判定单勾选优先仓库 <span class="arrow">→</span> <span class="chip chip--btn">发起判定</span>。<br>
              <strong>结果</strong>　优先仓充足 → <span class="auto">生成移仓明细</span>；不足时无事发生（不回退到其他模式）。
            </p>
          </div>
          <div class="mode-card">
            <span class="mode-tag">模式 B</span>
            <h4>六仓轮询</h4>
            <p>系统自动遍历所有学校仓 + 自动处理拆换标。年底积压场景首选。</p>
            <p class="mode-meta">
              <strong>命中规则</strong>　学校名称 + SKU 双维匹配。<br>
              <strong>结果</strong>　命中非本校仓时 <span class="auto">自动写入 <span class="chip chip--field">拆换标备注</span> / <span class="chip chip--field">拆换标入库单</span> / <span class="chip chip--field">拆换商品款号</span></span>。
            </p>
          </div>
          <div class="mode-card">
            <span class="mode-tag">模式 C</span>
            <h4>大仓直发</h4>
            <p>不关心学校仓库存，只走大仓。</p>
            <p class="mode-meta">
              <strong>步骤</strong>　选大仓直发 <span class="arrow">→</span> <span class="chip chip--btn">发起判定</span>。<br>
              <strong>结果</strong>　充足 / 可拆换标 → <span class="chip chip--state">锁库存</span>；不足 → 采购。
            </p>
          </div>
        </div>

        <h4>六仓轮询的判定顺序</h4>
        <div class="flow-canvas">
          <div class="flow">
            <span class="step step--terminal">订单</span>
            <span class="line"></span>
            <span class="step step--decision">本校仓充足?</span>
            <div class="branches">
              <div class="branch">
                <span class="branch-label">是</span>
                <span class="line"></span>
                <span class="step step--output">分配本校仓</span>
              </div>
              <div class="branch">
                <span class="branch-label">否</span>
                <span class="line"></span>
                <span class="step step--decision">大仓充足?</span>
                <div class="branches">
                  <div class="branch">
                    <span class="branch-label">是</span>
                    <span class="line"></span>
                    <span class="step step--output">分配大仓</span>
                  </div>
                  <div class="branch">
                    <span class="branch-label">否</span>
                    <span class="line"></span>
                    <span class="step step--decision">其他 5 校仓可拆换?</span>
                    <div class="branches">
                      <div class="branch">
                        <span class="branch-label">是</span>
                        <span class="line"></span>
                        <span class="step step--output">分配 + 生成移仓单</span>
                      </div>
                      <div class="branch">
                        <span class="branch-label">否</span>
                        <span class="line"></span>
                        <span class="step step--decision">拆换标可行?</span>
                        <div class="branches">
                          <div class="branch">
                            <span class="branch-label">是</span>
                            <span class="line"></span>
                            <span class="step step--output">生成拆换入库单</span>
                          </div>
                          <div class="branch">
                            <span class="branch-label">否</span>
                            <span class="line"></span>
                            <a href="#purchase" class="step step--link">进入采购</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p class="flow-caption">命中即出库时直接扣减拆换库存，<strong>不要手动二次操作</strong>。</p>
        </div>

        <h3>3.3 判定结果分流</h3>
        <div class="tbl">
          <table>
            <thead><tr><th>结果</th><th>系统自动</th><th>你要做的</th></tr></thead>
            <tbody>
              <tr><td>无缺货</td><td><span class="auto">锁定库存</span></td><td>等进入 五、出库准备</td></tr>
              <tr><td>拆换标</td><td><span class="auto">生成正负拆换标入库单 + 锁库存</span></td><td>见 3.3.1 通知仓库</td></tr>
              <tr><td>库存不足</td><td><span class="auto">生成采购单 + 渠道序号</span></td><td>见 3.3.2 转采购</td></tr>
            </tbody>
          </table>
        </div>

        <h4 id="inv-331">3.3.1 拆换标后续</h4>
        <p>角色：业务 → 仓库。</p>
        <ol class="dtree-body" style="font-size: 15.5px; line-height: 1.6;">
          <li style="padding-left: 22px; position: relative;"><span style="position: absolute; left: 0; color: var(--ink-48); font-weight: 600;">1.</span>业务导出系统生成的正负拆换标入库单。</li>
          <li style="padding-left: 22px; position: relative;"><span style="position: absolute; left: 0; color: var(--ink-48); font-weight: 600;">2.</span>仓库换标完成。</li>
        </ol>
        <div class="notice">拆换入库单生成时即为 <span class="chip chip--state">已入库</span>，<strong>无需手动改状态</strong>；若有差异由仓库二次复核（3.5）处理。</div>

        <h4 id="inv-332">3.3.2 库存不足后续</h4>
        <p>角色：业务 → 财务。</p>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <ol>
                <li>打开系统生成的采购单 <span class="arrow">→</span> 记单号。</li>
                <li>导出 <span class="chip chip--view">集团导入格式明细</span>。</li>
                <li>发财务时 <strong>勾选「已调货」</strong>。</li>
                <li>跟进采购交期。</li>
                <li>到货 <span class="arrow">→</span> <span class="auto">订单自动解锁</span>。</li>
              </ol>
            </div>
          </div>
        </div>

        <h3>3.4 扣货无实物在途二次复核</h3>
        <p>仓库标记"扣货无实物"时，实物可能正在总部到仓的途中；先用本流程自动核对，避免误判为缺货。</p>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">仓库标记"扣货无实物"。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">仓库扣货工作处理</span></span></div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <p>点 <span class="chip chip--btn">查是不是在途</span>，系统按下列规则查询：</p>
              <ul>
                <li>直接扣货 → 使用扣货的 SKU</li>
                <li>拆换扣货 → 使用拆换的 SKU</li>
                <li>判断方法：入库明细中已入库但入库时间为空的 SKU 总数 − 出库明细中锁库存且非本批次的 SKU = 在途未扣货数</li>
              </ul>
            </div>
          </div>
          <div class="op-row">
            <span class="op-label">结果</span>
            <div class="op-body">备注中记录"在途可扣数量"；具体渠道可在 <span class="chip chip--sheet">仓库导航仪</span> 仪表盘查询。</div>
          </div>
          <div class="op-row">
            <span class="op-label">异常</span>
            <div class="op-body">在途数 = 0 → 进入 3.5 仓库二次复核。</div>
          </div>
        </div>

        <h3>3.5 仓库二次复核 · 账实不符</h3>
        <p>在途复核确认不是采购在途后，由系统自动生成扣货处理表，让仓库手机端处理。</p>
        <div class="op-unit">
          <div class="op-row">
            <span class="op-label">触发</span>
            <div class="op-body">仓库实物清点与系统记录不符。</div>
          </div>
          <div class="op-row">
            <span class="op-label">位置</span>
            <div class="op-body"><span class="loc"><span class="loc-pin"></span><span class="chip chip--sheet">业务锁库存账实不符记录和处理流程单</span></span>（仓库入口：<span class="chip chip--sheet">仓库扣货工作处理工作流</span>）</div>
          </div>
          <div class="op-row">
            <span class="op-label">步骤</span>
            <div class="op-body">
              <p>按下表对应填写复核动作；系统自动处理。</p>
              <div class="tbl">
                <table>
                  <thead><tr><th>场景</th><th>异常</th><th>复核动作（仓库填）</th><th>系统自动</th></tr></thead>
                  <tbody>
                    <tr><td>直接扣货</td><td>扣货无实物</td><td>填 <span class="chip chip--field">实际可扣数量</span></td><td>改出库单 / 不足转 <span class="chip chip--state">调货中</span> / 生成负入库单清零</td></tr>
                    <tr><td>拆换标</td><td>拆换标无实物</td><td>填 <span class="chip chip--field">可拆换数量</span></td><td>不足转 <span class="chip chip--state">调货中</span> / 改拆换入库单 / 负入库单清零</td></tr>
                    <tr><td>拆换标</td><td>无法拆换</td><td>勾「无法拆换」+ 填 <span class="chip chip--field">可拆数量</span></td><td>改拆换入库单 / 不足转 <span class="chip chip--state">调货中</span></td></tr>
                    <tr><td>拆换标</td><td>修改拆换</td><td>选新拆换 SKU + 填 <span class="chip chip--field">可拆数量</span></td><td>更新拆换 SKU / 不足转 <span class="chip chip--state">调货中</span></td></tr>
                    <tr><td>调货</td><td>仓库实际有货</td><td>填 <span class="chip chip--field">实际库存数</span></td><td>生成入库单 / <span class="chip chip--state">调货中</span> → <span class="chip chip--state">锁库存</span></td></tr>
                    <tr><td>调货</td><td>可拆换替代</td><td>选拆换 SKU + 填 <span class="chip chip--field">可拆数量</span></td><td>生成拆换入库单 / <span class="chip chip--state">调货中</span> → <span class="chip chip--state">锁库存</span></td></tr>
                  </tbody>
                </table>
              </div>
              <p style="margin-top: 12px;"><strong>示例</strong>　SKU-A 计划扣 10 件，仓库实际 9 件 → 填 9 → <span class="auto">扣 9 件 + 1 件转调货 + 生成入库单 A −1 件清零</span>。</p>
            </div>
          </div>
        </div>
        <div class="notice"><strong>适用范围</strong>　目前仅大仓；学校仓暂不支持自动生成扣货计划表。</div>
